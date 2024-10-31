export default function Avatar({ name, size }) {
  return (
    <img
      className={`w-[35px] avatar rounded-full`}
      src={`https://ui-avatars.com/api/?name=${name}&background=3B82F6&color=fff&bold=true`}
      alt={`Foto de perfil de ${name}`}
    />
  );
}
