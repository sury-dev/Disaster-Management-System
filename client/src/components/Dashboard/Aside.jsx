export default function Aside() {
  return (
    <aside
      id="help"
      className="w-full lg:w-[34.5%] h-[40rem] rounded-lg flex flex-col justify-between gap-4"
    >
      <section className="h-3/4 grid gap-4">
        <a className="flex justify-between items-center font-bold p-8 border-2 border-dark-purple bg-white text-right py-4 text-dark-purple text-3xl rounded-lg group">
          <i className="fas fa-exclamation-triangle mr-2 text-[#FF6347] text-6xl group-hover:scale-110 duration-100"></i>
          <span>Report A Disaster</span>
        </a>
        <a className="flex justify-between items-center font-bold p-8 border-2 border-dark-purple bg-white text-right py-4 text-dark-purple text-3xl rounded-lg group">
          <i className="fas fa-hand-holding-heart mr-2 text-[#32CD32] text-6xl group-hover:scale-110 duration-100"></i>
          <span>Donate To Rescue Camps</span>
        </a>
        <a className="flex justify-between items-center font-bold p-8 border-2 border-dark-purple bg-white text-right py-4 text-dark-purple text-3xl rounded-lg group">
          <i className="fas fa-hands-helping mr-2 text-[#FFD700] text-6xl group-hover:scale-110 duration-100"></i>
          <span>Volunteer</span>
        </a>
        <a className="flex justify-between items-center font-bold p-8 border-2 border-dark-purple bg-white text-right py-4 text-dark-purple text-3xl rounded-lg group">
          <i className="fas fa-list mr-2 text-[#1E90FF] text-6xl group-hover:scale-110 duration-100"></i>
          <span>Alert List</span>
        </a>
      </section>
    </aside>
  );
}
