import { Enriqueta } from "next/font/google";

const enriqueta = Enriqueta({ weight: "400", subsets: ["latin"] });

type Props = {
  params: {
    img: string;
  };
};

const PrintPage = ({ params }: Props) => {
  return (
    <div
      className={
        enriqueta.className +
        " h-screen w-screen flex flex-col jusify-center items-center"
      }
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img
          className="h-full w-full object-contain mb-16"
          src={`https://shibalab-reincarnation-ws.fly.dev/${params.img}`}
        ></img>
        <p>2024/03/17 reincarnation</p>
      </div>
    </div>
  );
};

export default PrintPage;
