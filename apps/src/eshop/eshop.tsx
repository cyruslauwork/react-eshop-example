import React, { useState, useEffect } from "react";
import { shopItems, getAllItems, Item } from "./core";
import axios from "axios";

interface LineItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export const EShop: React.FC = function () {
  const [cart, setCart] = useState<LineItem[]>([]);
  const cartItem_xScrollContainer_visability = cart.length > 0;

  function addItemToCart(item: Item) {
    const existingItem = cart.find((lineItem) => lineItem.id === item.id);
    if (existingItem) {
      const newCart = cart.map((lineItem) =>
        lineItem.id === item.id
          ? { ...lineItem, quantity: lineItem.quantity + 1 }
          : lineItem
      );
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        { id: item.id, title: item.title, price: item.price, quantity: 1 },
      ]);
    }
  }

  function increaseQuantity(index: number) {
    const newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
  }

  function decreaseQuantity(index: number) {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
      setCart(newCart);
    }
  }

  function removeItem(index: number) {
    cart.splice(index, 1);
    setCart([...cart]);
  }

  function resetCart() {
    setCart([]);
  }

  async function saveCart() {
    if (localStorage.getItem("token")) {
      const ascendingCart: number[] = [];
      for (let i = 0; i < shopItems.length; i++) {
        let found = false; // Flag variable to track if the condition was met
        outerLoop: for (let l = 0; l < shopItems.length; l++) {
          if (cart[l] !== undefined && cart[l].id !== undefined) {
            if (cart[l].id === shopItems[i].id) {
              ascendingCart.push(cart[l].quantity);
              found = true;
              break outerLoop;
            }
          }
        }
        if (!found) {
          ascendingCart.push(0); // Add null value if the condition was not met
        }
      }

      console.log(ascendingCart);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:4000/savecart",
        { token, ascendingCart },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(res.data);
    } else {
      alert("Not logged in yet");
    }
  }

  useEffect(() => {
    // Apply the animation effect after components have been rendered
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el) => el.classList.add("active"));
    }, 10);

    return () => clearTimeout(timer);
  }, [cart]);

  return (
    <div>
      <p>Items: </p>
      <div className="x-scroll-container">
        {getAllItems().map((item, index) => (
          <ShopItem
            key={item.id}
            item={item}
            cart={cart}
            onAdd={() => addItemToCart(item)}
            className="fade-in"
          />
        ))}
      </div>
      <p>Cart items: </p>
      <div
        // style={{ marginLeft: "0.1rem" }}
        className={
          cartItem_xScrollContainer_visability ? "x-scroll-container" : ""
        }
      >
        {cart.map((item, index) => (
          <CartItem
            key={item.id}
            lineItem={item}
            onIncrease={() => increaseQuantity(index)}
            onDecrease={() => decreaseQuantity(index)}
            onRemove={() => removeItem(index)}
            className="fade-in"
          />
        ))}
      </div>
      <hr />
      <p>
        Total Amount:{" "}
        {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </p>
      <button className="button-28" onClick={resetCart}>
        Reset cart
      </button>
      <button className="button-28" onClick={saveCart}>
        Save
      </button>
    </div>
  );
};

const ShopItem: React.FC<{
  item: Item;
  cart: LineItem[];
  onAdd: () => void;
  className?: string;
}> = function ({ item, cart, onAdd, className }) {
  const { title, description, price } = item;
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleAddToCart = () => {
    onAdd();
    setButtonDisabled(true);
  };

  useEffect(() => {
    if (
      cart.length === 0 ||
      !cart.find((lineitem) => lineitem.id === item.id)
    ) {
      // Reset buttonDisabled state when cart is empty
      setButtonDisabled(false);
    }
  }, [cart]);

  return (
    <table className={`bg-white ${className ? className : ""}`}>
      <tbody>
        <tr>
          <td>
            <p>{title}</p>
          </td>
        </tr>
        <tr>
          <td>
            {description !== "No idea" ? <p>{description}</p> : <p>&nbsp;</p>}
          </td>
        </tr>
        <tr>
          <td>
            <p>${price}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <button
                className="button-28"
                onClick={handleAddToCart}
                disabled={buttonDisabled}
              >
                Add to shopping cart
              </button>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const CartItem: React.FC<{
  lineItem: LineItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  className?: string;
}> = function ({ lineItem, onIncrease, onDecrease, onRemove, className }) {
  const { title } = lineItem;
  const isDecreaseDisabled = lineItem.quantity <= 1;

  return (
    <div className={`bg-white ${className ? className : ""}`}>
      <p>{title}</p>
      <p>
        <button onClick={onIncrease}>+</button>&nbsp;Quantity:{" "}
        {lineItem.quantity}&nbsp;
        <button onClick={onDecrease} disabled={isDecreaseDisabled}>
          -
        </button>
      </p>
      <button className="button-28" onClick={onRemove}>
        Remove item
      </button>
    </div>
  );
};
