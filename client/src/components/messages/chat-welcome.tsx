import { useAuth } from "@/hooks/useAuth";
import Robot from "@/assets/hello.gif";
const Welcome = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={Robot} style={{ height: "200px" }} />
      <h1 className="scroll-m-20 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight lg:text-5xl">
        Bienvenue, <span>{user && user.firstname}.</span>
      </h1>
      <h3 className="font-medium">
        Sélectionner un destinataire pour envoyer un message.
      </h3>
    </div>
  );
};

export { Welcome };
