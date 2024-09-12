export default function Aside() {
  return (
    <aside
      id="help"
      className="hidden lg:block w-full lg:w-[28.5%] h-[38rem] rounded-3xl"
    >
      <section
        id="chat"
        className="relative h-full w-full flex flex-col justify-between gap-4"
      >

        <p
          id="chatbot-chat"
          className="w-full bg-white text-dark-purple-x border-2 border-dark-purple-x p-6 flex-1 rounded-3xl"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero
          quisquam laboriosam ea inventore molestias. Nemo amet quis incidunt
          suscipit, vero dolores in id rem porro inventore, odio recusandae
          repudiandae quos. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Vero quisquam laboriosam ea inventore molestias. Nemo amet quis
          incidunt suscipit, vero dolores in id rem porro inventore, odio
          recusandae repudiandae quos. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Vero quisquam laboriosam ea inventore molestias.
          Nemo amet quis incidunt suscipit, vero dolores in id rem porro
          inventore, odio recusandae repudiandae quos. Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Vero quisquam laboriosam ea
          inventore molestias. Nemo amet quis incidunt suscipit, vero dolores in
          id rem porro inventore, odio recusandae repudiandae quos. Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Vero quisquam laboriosam
          ea inventore molestias. Nemo amet quis incidunt suscipit, vero dolores
          in id rem porro inventore, odio recusandae repudiandae quos. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Vero quisquam
          laboriosam ea inventore molestias. Nemo amet quis incidunt suscipit,
          vero dolores in id rem porro inventore, odio recusandae repudiandae
          quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero
          quisquam laboriosam ea inventore molestias. Nemo amet quis incidunt
          suscipit, vero dolores in id rem porro inventore, odio recusandae
          repudiandae quos. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Vero quisquam laboriosam ea inventore molestias. Nemo amet quis
          incidunt suscipit, vero dolores in id rem porro inventore, odio
          recusandae repudiandae quos. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Vero quisquam laboriosam ea inventore molestias.
          Nemo amet quis incidunt suscipit, vero dolores in id rem porro
          inventore, odio recusandae repudiandae quos.
        </p>
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