import { showToast } from "nextjs-toast-notify";

export async function copyClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    showToast.success("Snippet copiato con successo!", {
      duration: 4000,
      progress: true,
      position: "bottom-center",
      transition: "slideInUp",
      icon: '',
      sound: true,
    });
  } catch (error) {
    console.error(error);
    showToast.error("Problema nella copia dello snippet!", {
      duration: 4000,
      progress: true,
      position: "bottom-center",
      transition: "slideInUp",
      icon: '',
      sound: true,
    });
  }
}
