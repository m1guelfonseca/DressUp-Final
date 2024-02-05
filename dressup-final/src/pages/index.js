import Link from 'next/link';
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <div>
        <div style={{
          zIndex: -1,
          position: 'fixed',
          width: "100vw",
          height: "100vh"
        }}>
          <Image
            src="/images/background.jpg"
            alt="DressUp"
            fill
            cover
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl sm:px-8 sm:py-24 lg:px-8">
        <div className="relative isolate overflow-hidden bg-white px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-36 lg:text-left">
            <h2 className="text-3xl text-gray-900 font-bold tracking-tight sm:text-4xl">
              Bem-Vindo ao DressUp
              <br />
              O Armário Inteligente!
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Desenvolvido com o intuíto de poupar cada segundo do teu dia!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link href="/auth/login" className="w-full rounded bg-purple-500 hover:bg-purple-400 py-3 text-center text-white">
                Login
              </Link>
              <Link href="/auth/signup" className="w-full rounded bg-purple-500 hover:bg-purple-400 py-3 text-center text-white">
                Registrar <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 pl-12 lg:mt-12">
            <Image
              className=""
              src="/images/roupa3_fs.png"
              alt=""
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
