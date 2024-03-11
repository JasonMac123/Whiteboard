import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
      <Image
        src={"/images/WhiteBoard.png"}
        alt="Logo"
        width={200}
        height={200}
        className="animate-pulse duration-700"
      />
    </div>
  );
};
