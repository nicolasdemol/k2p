import { useAuth } from "@/hooks/useAuth";
import Robot from "@/assets/hello.gif";
const Welcome = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={Robot} style={{ height: "200px" }} />
      <h1 className="scroll-m-20 text-4xl font-bold text-[#007FFF] tracking-tight lg:text-4xl">
        De retour, <span>{user && user.firstname}.</span>
      </h1>
      <h3 className="font-medium">
        Sélectionner un destinataire pour envoyer un message.
      </h3>
    </div>
  );
};

export { Welcome };
