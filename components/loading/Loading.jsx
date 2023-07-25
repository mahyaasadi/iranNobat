import "components/loading/loading.css";
import Image from "next/image";
import { loading } from "components/imagepath";

const Loading = () => {
  return (
    <div className="loading">
      <Image
        src={loading}
        width="140"
        max-width="140"
        height="140"
        alt="loading"
      />
    </div>
  );
};

export default Loading;
