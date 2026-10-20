"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function Pills({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (id: string) => void;
  items: { id: string; label: string }[];
}) {
  return (
    <div className="inline-flex gap-0.5 rounded-full bg-line/70 p-1">
      {items.map((x) => (
        <button
          key={x.id}
          type="button"
          className={`rounded-full px-3 py-1.5 text-sm ${value === x.id ? "bg-lime text-bg" : "text-mute hover:text-text"}`}
          onClick={() => onChange(x.id)}
        >
          {x.label}
        </button>
      ))}
    </div>
  );
}

export function RailPick({
  on,
  onClick,
  children,
  done,
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
  done?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[10.5rem] shrink-0 rounded-xl px-3 py-2.5 text-left lg:w-full ${
        on ? "bg-lime/15 ring-1 ring-lime" : "hover:bg-white/[0.04]"
      }`}
    >
      {children}
      {done ? <p className="mt-1 text-[11px] text-lime">xong</p> : null}
    </button>
  );
}

export default function Studio({
  step,
  title,
  kicker,
  swap,
  onSwap,
  next,
  tabs,
  rail,
  stage,
}: {
  step?: number;
  title: string;
  kicker?: string;
  swap?: string;
  onSwap?: () => void;
  next?: { href: string; label: string };
  tabs?: ReactNode;
  rail?: ReactNode;
  stage: ReactNode;
}) {
  const crumb = step ? `Bước ${step}/4` : "Kho";
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col max-lg:min-h-[calc(100dvh-7.25rem)]">
      <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-4 py-3 lg:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-lime">
            {crumb}
            {kicker ? ` · ${kicker}` : ""}
          </p>
          <h1 className="mt-0.5 truncate font-serif text-2xl leading-none">{title}</h1>
        </div>
        {tabs}
        {swap && onSwap && (
          <button type="button" className="btn-ghost text-xs" onClick={onSwap}>
            {swap}
          </button>
        )}
        {next && (
          <Link href={next.href} className="text-sm text-lime">
            {next.label} →
          </Link>
        )}
      </header>
      <div className={`flex min-h-0 flex-1 flex-col ${rail ? "lg:grid lg:grid-cols-[16.5rem_1fr]" : ""}`}>
        {rail ? (
          <aside className="flex shrink-0 gap-2 overflow-x-auto border-b border-line px-3 py-3 lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-2">
            {rail}
          </aside>
        ) : null}
        <section className="min-h-0 flex-1 overflow-y-auto px-4 py-4 lg:px-8 lg:py-6">{stage}</section>
      </div>
    </div>
  );
}
