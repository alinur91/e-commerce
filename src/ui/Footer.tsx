import { GitHubRepoLastUpdated } from ".";

const Footer = () => {
  return (
    <footer className="border-text-400 fixed bottom-0 w-full border-t-2 border-gray-100 bg-white shadow-xl 2xl:container">
      <div className="flex flex-wrap items-center justify-center gap-x-24 gap-y-0 px-2 py-1 text-xs sm:px-10 md:justify-between ">
        <div>
          <span className="text-gray-500">Designed and Developed: </span>
          <span className="hover:text-Orange font-semibold uppercase underline">
            <a
              target="_blank"
              href="https://portfolio-alisher-nurlybayev.netlify.app/"
            >
              Alisher Nurlybayev
            </a>
          </span>
        </div>
        <GitHubRepoLastUpdated owner="alinur91" repo="e-commerce" />
      </div>
    </footer>
  );
};

export default Footer;
