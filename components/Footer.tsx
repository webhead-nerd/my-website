export default function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-50 p-4 text-center text-sm text-white bg-black-700/40">
      © {new Date().getFullYear()} Vishal Gunra
    </footer>
  );
}