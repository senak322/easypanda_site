import "./Header.scss";
// import { Select } from "antd";
// import { MailOutlined } from "@ant-design/icons";
// import { useWindowWidth } from "../../hooks/useWindowWidth";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
// import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from '@mui/material/InputBase';

function Header() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.8),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));  

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
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Найти заявку"  
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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
