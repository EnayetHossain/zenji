function Copyright() {
  return (
    <section
      className="flex flex-col md:flex-row justify-between mt-50 items-start md:items-center relative my-4 before:absolute before:-top-4 before:left-0 before:h-2 before:w-full before:bg-text"
    >
      <div className="text-7xl md:text-[clamp(5.4rem,6vw,10rem)] font-black leading-none">
        Made to be worn. <br /> <span className="text-accent-gray">Or judged. Or both.</span>
      </div>
      <div className="text-[clamp(2rem,50vw,100rem)] md:text-[clamp(5.4rem,14vw,20rem)] leading-none font-black text-center">&copy;26</div>
    </section>
  )
}

export default Copyright;
