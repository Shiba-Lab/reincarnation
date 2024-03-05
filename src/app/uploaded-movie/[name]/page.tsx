type Props = {
  params: {
    name: string;
  };
};

const UploadedMoviePage = ({ params }: Props) => {
  return (
    <video className="hidden" autoPlay>
      <source
        src={`https://shibalab-reincarnation-r2.shogo0x2e.com/${params.name}`}
      />
    </video>
  );
};

export default UploadedMoviePage;
