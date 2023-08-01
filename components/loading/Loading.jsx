import "components/loading/loading.css";
import Image from "next/image";
import { loading } from "components/imagepath";

const Loading = () => {
  return (
    <div className="loading">
      <Image
        src={loading}
        width="150"
        max-width="150"
        height="150"
        alt="loading"
        priority={true}
      />
    </div>
  );
};

export default Loading;
