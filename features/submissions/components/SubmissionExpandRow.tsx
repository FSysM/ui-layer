import type { Submissions } from '../types/submissions.types'

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value ?? '—'}</span>
    </div>
  )
}

export function SubmissionExpandRow({ row }: { row: Submissions }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
        <Field label="Faculty" value={row.faculty} />
        <Field label="Department" value={row.department} />
        <Field label="Annotation" value={row.annotation} />
        {row.literature && <Field label="Literature" value={row.literature} />}
        {row.fileUrl && <Field label="File URL" value={row.fileUrl} />}
        {row.opponent && <Field label="Opponent" value={row.opponent.name} />}
      </div>

      {row.reviews.length > 0 ? (
        <div className="border-t pt-3 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Reviews
          </p>
          {row.reviews.map((review) => (
            <div key={review.id} className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              <Field label="Type" value={review.type} />
              <Field label="Grade" value={review.grade} />
              {review.comment && <Field label="Comment" value={review.comment} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t pt-3">
          <p className="text-xs text-muted-foreground">No reviews yet</p>
        </div>
      )}
    </div>
  )
}
