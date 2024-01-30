import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center ">
        <h1 className="head_text text-center ">
          Discover & Share 
          <br className="max-md:hidden"/>
          <span className="orange_gradient text-center"> AI-Powered Prompts</span>
        </h1>
        <p className="mt-3">
          Promtopia is a open-source AI propmting tool for modern world to discover, create and share creative prompts
        </p>
        <Feed/>
    </section>
  )
}

export default Home
//Root page 