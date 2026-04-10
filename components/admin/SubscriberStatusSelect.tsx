"use client";

import { useTransition } from "react";
import { updateSubscriberStatusAction } from "@/app/admin/subscribers/actions";
import { SUBSCRIBER_STATUSES, SUBSCRIBER_STATUS_LABELS, type SubscriberStatus } from "@/lib/subscribers/domain";

type Props = {
  id: string;
  current: SubscriberStatus;
};

export function SubscriberStatusSelect({ id, current }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={current}
      disabled={pending}
      onChange={(e) => {
        const v = e.target.value as SubscriberStatus;
        startTransition(() => updateSubscriberStatusAction(id, v));
      }}
      className="rounded-lg border border-brand-border px-2 py-1 text-xs font-medium bg-white"
    >
      {SUBSCRIBER_STATUSES.map((s) => (
        <option key={s} value={s}>
          {SUBSCRIBER_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
