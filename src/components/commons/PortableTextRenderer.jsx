import { PortableText } from '@portabletext/react';

const components = {
  block: {
    h1: ({children}) => <h1 className="text-4xl font-display font-bold text-dark mt-8 mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-3xl font-display font-bold text-dark mt-6 mb-4">{children}</h2>,
    h3: ({children}) => <h3 className="text-2xl font-display font-bold text-dark mt-6 mb-4">{children}</h3>,
    h4: ({children}) => <h4 className="text-xl font-display font-bold text-dark mt-4 mb-3">{children}</h4>,
    normal: ({children}) => <p className="mb-4 text-base leading-relaxed">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({children}) => <strong className="font-bold text-secondary">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({value, children}) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="ml-4">{children}</li>,
    number: ({children}) => <li className="ml-4">{children}</li>,
  },
};

export default function PortableTextRenderer({ content }) {
  if (!content) return null;
  return <PortableText value={content} components={components} />;
}
