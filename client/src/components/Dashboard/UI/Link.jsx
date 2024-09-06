export default function Link({ route, children }) {
  return (
    <a
      href={route}
      className="mr-8 text-2xl text-dark-purple font-bold hover:border-b-2 hover:border-dark-purple"
    >
      {children}
    </a>
  );
}