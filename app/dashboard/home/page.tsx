'use client';

import { useState, useMemo } from 'react';
import { isSameDay, format } from 'date-fns';
import { BookOpen, FileText, CheckCircle, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import PageHeader from '@/components/layout/PageHeader';
import { useMe } from '@/features/auth/hooks/useMe';
import { useAssignments } from '@/features/assignments/hooks/useAssignments';
import { useSubmissions } from '@/features/submissions/hooks/useSubmissions';
import type { Assignments } from '@/features/assignments/types/assignments.types';
import type { Submissions } from '@/features/submissions/types/submissions.types';
import { cn } from '@/lib/utils';

type CalendarEvent = {
  date: Date;
  label: string;
  type: 'assignment' | 'submission';
  badge?: string;
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
};

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: user } = useMe();
  const { data: myAssignmentsRaw = [] } = useAssignments('my');
  const { data: submissionsRaw = [] } = useSubmissions();

  const myAssignments = myAssignmentsRaw as Assignments[];
  const submissions = submissionsRaw as Submissions[];

  const role = user?.role;

  const takenCount = myAssignments.filter((a) => a.taken).length;
  const pendingCount = submissions.filter((s) => s.status === 'PENDING' || s.status === 'IN_PROGRESS').length;
  const completedCount = submissions.filter((s) => s.status === 'COMPLETED').length;

  const stats =
    role === 'TEACHER'
      ? [
          { title: 'My assignments', value: myAssignments.length, icon: <BookOpen className="h-4 w-4" />, description: 'Created by you' },
          { title: 'Students supervised', value: takenCount, icon: <Users className="h-4 w-4" />, description: 'Assignments taken' },
          { title: 'Pending review', value: pendingCount, icon: <Clock className="h-4 w-4" />, description: 'Awaiting action' },
          { title: 'Completed', value: completedCount, icon: <CheckCircle className="h-4 w-4" />, description: 'Finished submissions' },
        ]
      : [
          { title: 'My assignment', value: myAssignments.length, icon: <BookOpen className="h-4 w-4" />, description: role === 'STUDENT' ? 'Picked by you' : 'Assigned to you' },
          { title: 'Total submissions', value: submissions.length, icon: <FileText className="h-4 w-4" />, description: 'All your submissions' },
          { title: 'Pending', value: pendingCount, icon: <Clock className="h-4 w-4" />, description: 'Awaiting review' },
          { title: 'Completed', value: completedCount, icon: <CheckCircle className="h-4 w-4" />, description: 'Approved submissions' },
        ];

  const events = useMemo<CalendarEvent[]>(() => {
    const result: CalendarEvent[] = [];

    myAssignments.forEach((a) => {
      if (a.assignmentDate) {
        result.push({
          date: new Date(a.assignmentDate),
          label: a.topic,
          type: 'assignment',
          badge: a.type,
        });
      }
    });

    submissions.forEach((s) => {
      if (s.submissionDate) {
        result.push({
          date: new Date(s.submissionDate),
          label: s.topic,
          type: 'submission',
          badge: s.status,
        });
      }
    });

    return result;
  }, [myAssignments, submissions]);

  const eventDates = useMemo(() => events.map((e) => e.date), [events]);

  const selectedEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter((e) => isSameDay(e.date, selectedDate));
  }, [events, selectedDate]);

  return (
    <div className="p-6">
      <PageHeader title="Dashboard" />

      {/* Stats */}
      <div className="mt-6 mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <div className="text-muted-foreground">{s.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar + Events */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-lg border"
          captionLayout="dropdown"
          modifiers={{ hasEvent: eventDates }}
          modifiersClassNames={{
            hasEvent: '[&>button]:ring-1 [&>button]:ring-primary/60',
          }}
        />

        <div className="flex-1">
          <h2 className="mb-4 text-lg font-semibold">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </h2>

          {selectedEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events for this day.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedEvents.map((event, i) => (
                <Card key={i}>
                  <CardContent className="flex items-center gap-3 px-4 py-3">
                    <div
                      className={cn(
                        'h-2 w-2 shrink-0 rounded-full',
                        event.type === 'assignment' ? 'bg-blue-500' : 'bg-emerald-500'
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{event.label}</p>
                      <p className="text-xs capitalize text-muted-foreground">{event.type}</p>
                    </div>
                    {event.badge && (
                      <Badge variant="secondary" className="shrink-0 text-xs capitalize">
                        {STATUS_LABEL[event.badge] ?? event.badge}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
