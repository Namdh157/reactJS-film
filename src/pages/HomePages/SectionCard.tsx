import { MovieItem } from "../../Types/movieTypes";

interface SectionCardProps {
  movie: MovieItem;
}

const SectionCard = ({ movie }: SectionCardProps) => {
  return (
    <div className="group relative h-60 transition-all duration-300 ease-in-out hover:col-span-2">
      <img src={movie.poster_url} className=" w-full h-56 object-cover" alt={movie.name} />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#111111] to-transparent" />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="text-center">
          <h3 className="text-lg font-bold">{movie.name}</h3>
          <p className="text-xs">{movie.year}</p>
        </div>
      </div>
    </div>
  )
}

export default SectionCard