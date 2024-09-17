import Button from "./UI/Button";

export default function Footer() {
  return (
    <section className="py-4 px-8 h-3/4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
      <a className="flex gap-8 border-2 border-dark-purple-x rounded-3xl items-center p-8 box-border cursor-pointer py-4 bg-white text-dark-purple group">
        <i className="fas fa-exclamation-triangle mr-2 text-[#FF6347] text-6xl group-hover:scale-110 duration-100"></i>
        <div>
          <p className="text-3xl">Report A Disaster</p>
          <p className="text-xl text-dark-purple-x">Update us about disaster near you</p>
        </div>
      </a>
      <a className="flex gap-8 border-2 border-dark-purple-x rounded-3xl items-center p-8 box-border cursor-pointer py-4 bg-white text-dark-purple group">
        <i className="fas fa-list mr-2 text-[#1E90FF] text-6xl group-hover:scale-110 duration-100"></i>
        <div>
          <p className="text-3xl">Alert List</p>
          <p className="text-xl text-dark-purple-x">Get updates on Indian Disasters</p>
        </div>
      </a>

      <a className="flex gap-8 border-2 border-dark-purple-x rounded-3xl items-center p-8 box-border cursor-pointer py-4 bg-white text-dark-purple group">
        <i className="fas fa-hands-helping mr-2 text-[#FFD700] text-6xl group-hover:scale-110 duration-100"></i>
        <div>
          <p className="text-3xl mb-2">Rescue Together</p>
          <p className="text-xl text-dark-purple-x flex">
            <Button>Volunteer</Button>
            <Button>Donate</Button>
          </p>
        </div>
      </a>
    </section>
  );
}
