export default function Aside() {
  return (
    <aside
      id="help"
      className="hidden lg:block w-full lg:w-[28.5%] rounded-3xl"
    >
      <section
        id="chat"
        className="w-full h-full flex flex-col justify-between gap-4"
      >
        <section className="w-full h-[88%] flex flex-col justify-between bg-white border-2 border-dark-purple-x p-4 flex-1 rounded-3xl">
          <h2 className="text-4xl text-dark-purple-x mb-4">
            SachetakAI
          </h2>
          <p
            id="chatbot-chat"
            className="w-full text-dark-purple-x flex flex-col gap-4"
          >
            <p className="bg-purple-400 rounded-lg text-white p-4 w-2/3 text-left self-start">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero
            quisquam laboriosam ea inventore molestias. Nemo amet quis incidunt
            suscipit, vero dolores in id rem porro inventore
            </p>

            <p className="bg-dark-purple rounded-lg text-white p-4 w-2/3 text-right self-end">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero
            quisquam laboriosam ea inventore molestias. Nemo amet quis incidunt
            suscipit, vero dolores in id rem porro inventore
            </p>
          </p>
        </section>
        <p className="w-full bg-dark-purple border border-dark-purple-x rounded-2xl flex items-center">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="h-12 w-[80%] text-black px-4 text-xl outline-none rounded-tl-2xl rounded-bl-2xl"
          />
          <button className="flex-1 rounded-tr-2xl rounded-br-2xl text-white text-2xl bg-dark-purple hover:bg-dark-purple-x h-full">
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
        </p>
      </section>
    </aside>
  );
}
