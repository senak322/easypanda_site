import "./Header.scss";
// import { Select } from "antd";
// import { MailOutlined } from "@ant-design/icons";
// import { useWindowWidth } from "../../hooks/useWindowWidth";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
// import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useCallback, useState } from "react";
import { useGetOrderQuery } from "../../services/api";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
  },
  marginLeft: 0,
  width: "100%",
  display: "flex", // Добавлено для выравнивания
  alignItems: "center", // Добавлено для выравнивания
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Header() {
  const navigate = useNavigate();
  const [searchError, setSearchError] = useState("");
  const [searchHash, setSearchHash] = useState("");
  const {
    data: order,
    isFetching,
    error,
  } = useGetOrderQuery(searchHash, {
    skip: searchHash.length !== 6, // Пропускаем запрос, если хеш не полный
  });

  // useEffect(() => {
  //   if (order && !isFetching) {
  //     navigate(`/order/:${searchHash}`);
  //   } else if (error) {
  //     setSearchError("Заявка не найдена");
  //   }
  // }, [order, isFetching, error, searchHash, navigate]);

  const handleSearchClick = useCallback(() => {
    if (order && searchHash.length === 6 && !isFetching) {
      navigate(`/order/${searchHash}`);
      setSearchHash("");
      setSearchError("");
    } else if (error) {
      setSearchError("Заявка не найдена");
    }
  }, [error, order, isFetching, searchHash, navigate]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHash = e.target.value.trim();
      setSearchHash(newHash);
    },
    []
  );

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <Link className="header__link" to="/">
            <div className="header__logo">
              <img
                className="header__img"
                src={"../../images/panda_logo.jpg"}
                alt="easypandamoney logo"
              />
            </div>
            <h2 className="header__title">Easy Panda Money</h2>
          </Link>
        </div>
        <div className="header__container">
          <Search>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <StyledInputBase
              placeholder="Найти заявку"
              inputProps={{ "aria-label": "search" }}
              value={searchHash}
              onChange={handleSearchChange}
            />
            <IconButton onClick={handleSearchClick} aria-label="search">
              <SearchIcon />
            </IconButton>
            {searchError && <div>{searchError}</div>}
          </Search>
          {searchError && <p>searchError</p>}
          {/* <p className="header__search">Найти заявку</p> */}
          {/* <Select
            defaultValue={"ru"}
            options={[
              { value: "ru", label: "RU" },
              { value: "eng", label: "ENG" },
            ]}
          ></Select> */}
        </div>
      </header>
    </>
  );
}

export default Header;
