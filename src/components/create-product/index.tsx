import React, { useState } from "react";

import { Dialog, Button } from "@material-ui/core";
import useStyles from "./styles";

import FormInput from "../form-input";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateNewProduct } from "../../redux/actions";
import { AppState, Admin } from "../../types";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateProduct = ({ onClose, open }: DialogProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser, token: authCheck } = useSelector(
    (state: AppState) => state.user
  );
  const adminId = currentUser?._id;

  const [input, setInput] = useState({
    productName: "",
    imageUrl: "",
    productPrice: "",
    category: "",
  });
  const { productName, imageUrl, productPrice, category } = input;
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleCreateProduct = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      productName === "" &&
      imageUrl === "" &&
      productPrice === "" &&
      category === ""
    ) {
      return;
    }
    const data = {
      product: {
        name: productName,
        imageUrl,
        price: parseInt(productPrice),
        category: category.toLowerCase(),
      },
      adminId,
      authCheck,
    } as Admin;
    dispatch(adminCreateNewProduct(data));
    setInput({
      productName: "",
      imageUrl: "",
      productPrice: "",
      category: "",
    });
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <div className={classes.info}>
        <p className={classes.title}>Create New Product</p>
        <form className="sign-up-form" onSubmit={handleCreateProduct}>
          <FormInput
            type="text"
            name="productName"
            value={productName}
            handleChange={handleChange}
            label="Product Name"
            required
          />
          <FormInput
            type="url"
            name="imageUrl"
            value={imageUrl}
            handleChange={handleChange}
            label="Image URL"
            required
          />

          <FormInput
            type="text"
            name="productPrice"
            value={productPrice}
            handleChange={handleChange}
            label="Product Price"
            required
          />
          <FormInput
            type="text"
            name="category"
            value={category}
            handleChange={handleChange}
            label="Product Category"
            required
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            SUBMIT
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default CreateProduct;
