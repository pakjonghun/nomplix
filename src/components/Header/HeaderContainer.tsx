import React, { useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTransform, useViewportScroll } from "framer-motion";
import HeaderPresenter from "./HeaderPresenter";
import { TypeForm } from "../../utilities/types";

const HeaderContainer = () => {
  const [isSearching, setIsSearching] = useState(false);
  const isHome = useMatch("/");
  const { id } = useParams();
  const isModal = !!id;
  const isTop = useMatch("/movies/top");

  const toggleIsSearching = (value: boolean) => setIsSearching(value);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<TypeForm>();
  const onSubmit = (data: TypeForm) => {
    navigate(`/movies?term=${data.term}`);
  };

  const { scrollY } = useViewportScroll();

  const rgb = useTransform(
    scrollY,
    [0, 195],
    ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]
  );

  return (
    <HeaderPresenter
      funcs={{ onSubmit, register, toggleIsSearching, setFocus, handleSubmit }}
      props={{ rgb, isSearching, errors, isHome, isModal, isTop }}
    />
  );
};

export default HeaderContainer;
