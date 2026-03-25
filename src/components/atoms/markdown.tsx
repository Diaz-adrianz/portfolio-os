'use client';

import type { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';

const Markdown = ({
  children,
  ...props
}: ComponentProps<typeof ReactMarkdown>) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...p }: any) => (
          <h1 className="mb-4 text-3xl font-bold" {...p} />
        ),
        h2: ({ ...p }: any) => (
          <h2 className="mb-3 text-2xl font-semibold" {...p} />
        ),
        h3: ({ ...p }: any) => (
          <h3 className="mb-3 text-xl font-semibold" {...p} />
        ),
        h4: ({ ...p }: any) => (
          <h4 className="mb-2 text-lg font-semibold" {...p} />
        ),
        h5: ({ ...p }: any) => (
          <h5 className="mb-2 text-base font-semibold" {...p} />
        ),
        h6: ({ ...p }: any) => (
          <h6 className="mb-2 text-sm font-semibold" {...p} />
        ),
        p: ({ ...p }: any) => (
          <p className="mb-3 text-sm leading-relaxed" {...p} />
        ),
        strong: ({ ...p }: any) => <strong className="font-semibold" {...p} />,
        em: ({ ...p }: any) => <em className="italic" {...p} />,
        del: ({ ...p }: any) => (
          <del className="line-through opacity-70" {...p} />
        ),
        ul: ({ ...p }: any) => (
          <ul className="mb-3 ml-5 list-disc space-y-1" {...p} />
        ),
        ol: ({ ...p }: any) => (
          <ol className="mb-3 ml-5 list-decimal space-y-1" {...p} />
        ),
        li: ({ ...p }: any) => <li className="text-sm" {...p} />,
        blockquote: ({ ...p }: any) => (
          <blockquote
            className="my-3 border-l-4 pl-4 italic opacity-80"
            {...p}
          />
        ),
        hr: () => <hr className="border-border my-4" />,
        a: ({ ...p }: any) => (
          <a
            className="text-primary underline hover:opacity-80"
            target="_blank"
            {...p}
          />
        ),
        code({ inline, children, ...p }: any) {
          if (inline) {
            return (
              <code
                className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs"
                {...p}
              >
                {children}
              </code>
            );
          }

          return (
            <pre className="bg-muted my-3 overflow-x-auto rounded-md p-3">
              <code className="font-mono text-xs">{children}</code>
            </pre>
          );
        },
        table: ({ ...p }: any) => (
          <table className="my-4 w-full border-collapse text-sm" {...p} />
        ),
        thead: ({ ...p }: any) => (
          <thead className="bg-muted/50 border-b" {...p} />
        ),

        tbody: ({ ...p }: any) => <tbody {...p} />,

        tr: ({ ...p }: any) => <tr className="border-b" {...p} />,

        th: ({ ...p }: any) => (
          <th className="p-2 text-left font-semibold" {...p} />
        ),

        td: ({ ...p }: any) => <td className="p-2" {...p} />,

        img: ({ ...p }: any) => (
          <img className="my-3 max-w-full rounded-md" loading="lazy" {...p} />
        ),
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
};

export { Markdown };
