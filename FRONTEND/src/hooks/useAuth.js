import { useState } from "react";
import { register, login, googleAuth } from "../services/authService";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      await register(data);
      toast.success("Connexion réussie !", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      navigate("/email-verification", { state: { email: data.email } });
    } catch (err) {
      const msg = err.response?.data.message || "Erreur serveur";
      toast.error(`Erreur : ${msg}`, {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      console.log("res.data", res.data); 
      const { accessToken, refreshToken } = res.data.tokens;
      const role = res.data.utilisateur.role; // Assurez-vous que le rôle est dans la réponse

      Cookies.set("accessToken", accessToken.token);
      Cookies.set("refreshToken", refreshToken.token);

      
    
  
      toast.success("Connexion réussie !", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
  
      // Redirection en fonction du rôle
      switch (role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "operateur":
          navigate("/operateur-dashboard");
          break;
        case "responsable":
          navigate("/responsable-dashboard");
          break;
        case "technicien":
          navigate("/technicien-dashboard");
          break;
        case "magasinier":
          navigate("/magasinier-dashboard");
          break;
        default:
          navigate("/"); // redirection par défaut
      }
    } catch (err) {
      const msg = err.response?.data.message || "Erreur serveur";
      toast.error(`Erreur : ${msg}`, {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = () => {
    googleAuth();
  }
  
  return { handleSignUp, handleSignIn, handleGoogleSignIn, loading };
};

export default useAuth;
