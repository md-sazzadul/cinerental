import DeleteIcon from "../../assets/delete.svg";
import { Movie } from "../../data/movies";
import { getImgUrl } from "../../utils/cine-utility";

const CartItem: React.FC<{ item: Movie; onRemove: (item: Movie) => void }> = ({
  item,
  onRemove,
}) => {
  const finalPrice = item.discount
    ? (item.price * (100 - item.discount)) / 100
    : item.price;

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4">
      <div className="flex items-center gap-4">
        <img
          className="rounded overflow-hidden"
          src={getImgUrl(item.cover)}
          alt={item.title}
          width={50}
          height={50}
        />
        <div>
          <h3 className="text-base md:text-xl font-bold">{item.title}</h3>
          <p className="max-md:text-xs text-[#575A6E]">{item.genre}</p>
          <span className="max-md:text-xs">
            {item.discount ? (
              <>
                <span className="line-through text-red-500">
                  ${item.price.toFixed(2)}
                </span>{" "}
                <span className="text-green-500">${finalPrice.toFixed(2)}</span>
              </>
            ) : (
              `$${item.price.toFixed(2)}`
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between gap-4 items-center">
        <button
          className="bg-[#D42967] rounded-md p-2 md:px-4 inline-flex items-center space-x-2 text-white"
          onClick={() => onRemove(item)}
          aria-label={`Remove ${item.title} from cart`}
        >
          <img className="w-5 h-5" src={DeleteIcon} alt="Delete" />
          <span className="max-md:hidden">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
