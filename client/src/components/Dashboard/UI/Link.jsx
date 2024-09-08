export default function Link({ route, children }) {
  return (
    <a
      href={route}
      className="mr-8 pb-4 lg:text-2xl lg:text-dark-purple hover:border-b-2 lg:hover:border-dark-purple duration-75 lg:duration-0"
    >
      {children}
    </a>
  );
}