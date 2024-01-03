import './App.css'
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { TableContainer, TextField, Typography } from '@mui/material';
import { Box } from '@mui/material';
import Card1 from './components/Card1'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// table =
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Navigation } from 'swiper/modules';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
import Brightness4Icon from "@mui/icons-material/Brightness4";

import {
  ThemeProvider,
  CssBaseline,
  IconButton,
} from "@mui/material";

import { lightTheme, darkTheme } from "./theme/theme";
import Card2 from './components/Card2';
import Card3 from './components/Card3';
import Card4 from './components/Card4';
import Card5 from './components/Card5';
import Card6 from './components/Card6';
import Card7 from './components/Card7';

//Table 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//ACCARDION 
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const api = "http://localhost:3000/data"

const App = () => {
  const storedTheme = localStorage.getItem("darkMode");

  const [darkMode, setDarkMode] = useState(storedTheme == true);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode); //
    localStorage.setItem("darkMode", newDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;



  //modal 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //modal  add
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  //btn show todolist 
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList(!showList);
  };

  // Accardion
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [todo, setTodo] = useState([])
  const [addName, setAddName] = useState("")
  const [addCity, setAddCity] = useState("")
  const [addNumber, setAddNumber] = useState("")

  const [editName, setEditName] = useState("")
  const [editCity, setEditCity] = useState("")
  const [editNumber, setEditNumber] = useState("")
  // const [editStatus, setEditStatus] = useState("")
  const [idx, setIdx] = useState(null)


  async function get() {
    try {
      let { data } = await axios.get(api)
      setTodo(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get()
  }, [])

  async function deleteUser(id) {
    try {
      let { data } = await axios.delete(`${api}/${id}`)
      get()
    } catch (error) {
      console.log(error);
    }
  }

  async function editUser(id, user) {
    try {
      let { data } = await axios.put(`${api}/${id}`, user);
      get()
    } catch (error) {
      console.log(error);
    }
  }

  async function addUser(user) {
    try {
      let { data } = await axios.post(api, user)
      get()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* header */}
        <header className='bg relative z-1'>
          <main className='bg1 py-[20px]'>
            <nav className='flex items-center lg:px-[352px] justify-between relative z-2 sm:px-[24px]'>
              <img src="src/assets/nav/INNOMA.VC.png" />
              <Box className="lg:flex sm:hidden" sx={{ color: "white", gap: "40px" }}>
                <Typography>Кто мы?</Typography>
                <Typography>Услуги</Typography>
                <Typography>Акселератор</Typography>
                <Typography>Новости</Typography>
              </Box>

              <Box className=" flex item-center">
                <Button sx={{ background: "#07AF91", borderRaduis: "10px" }} variant="contained">Войти</Button>
                <CssBaseline />
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <IconButton onClick={toggleDarkMode} color="inherit">
                    <Brightness4Icon />
                  </IconButton>
                </Box>
              </Box>
            </nav>
            <Box className="sm:px-[20px] lg:pl-[352px] lg:pb-[300px] sm:pb-[200px] sm:text-center lg:text-start" sx={{ paddingTop: "140px", display: "flex", flexDirection: "column", alignItems: "start", gap: "15px" }}>
              <Box sx={{ color: "white", textTransform: "uppercase", fontWeight: "700" }}>
                <Box className=" lg:text-[43px] sm:text-[28px] mb-[20px]">Запустите</Box>
                <Box className=" inline lg:text-[43px] sm:text-[28px] " sx={{ background: "#07AF91", padding: "10px", borderRadius: "8px" }}>технологический IT-бизнес </Box>
                <Box className=" lg:text-[43px] sm:text-[28px] mt-[20px]">на международных рынках</Box>
              </Box>
              <Box className=" lg:text-[24px] sm:text-[18px] lg:text-start text-white sm:text-center mb-[20px]">Открыт набор заявок на акселератор</Box>
              <Button sx={{ background: "linear-gradient(276deg, #016CA8 -7%, #61B5E4 77.16%);1x", padding: "15px", color: "white" }}>Подать заявку</Button>
            </Box>
          </main>
        </header>


        {/* main */}
        <main>
          {/* section 1 */}
          <section className='lg:py-[110px] sm:py-[60px]'>
            <Typography sx={{ color: "#1178B2", textAlign: "center", fontSize: "36px", paddingBottom: "110px" }}>Наши услуги</Typography>
            <aside className='flex justify-center items-center gap-[27px] lg:pb-[200px] lg:flex-nowrap sm:flex-wrap' >
              <Box className="sm:px-[24px] lg:w-[500px]" sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "20px" }}>
                <Typography sx={{ color: " var(--1178-b-2, #1178B2)", fontSize: "24px" }}>Аналитические исследования</Typography>
                <Typography sx={{ fontSize: "16px" }}>Одним из наших ключевых направлений является анализ технологических трендов на международных рынках.Мы проводим анализ на основе публичных исследований McKinsey, BCG, PWC, Deloitte, Accenture, BCG, EY,  Crunchbase, Dealroom, F6S, PitchBook а также агрегируем и анализируем данные из открытых международных источников патенты, медиа, научные публикации</Typography>
                <Button sx={{ background: "var(--07-af-91, #07AF91)", color: "white", paddingLeft: "40px", paddingRight: "40px" }}>Узнать подробнее</Button>
              </Box>
              <Box>
                <img src="src/assets/main/kisspng-competitor-analysis-market-research-marketing-quan-5b102810d85456 1.png" alt="" />
              </Box>
            </aside>
            {/* 2 */}
            <aside className='flex justify-center items-center gap-[65px] lg:flex-nowrap sm:flex-wrap' >
              <Box>
                <img src="src/assets/main/rocket 1.png" className='lg:block sm:hidden' />
              </Box>
              <Box className="lg:flex lg:flex-col sm:flex-wrap sm:px-[24px] lg:w-[500px]" sx={{ alignItems: "start", gap: "20px" }}>
                <Typography sx={{ color: " var(--1178-b-2, #1178B2)", fontSize: "24px" }}>Онлайн акселератор для IT бизнеса</Typography>
                <Typography sx={{ fontSize: "16px" }}>Онлайн программа аскелерации IT бизнеса позволит вашей команде открыть новые горизонты и возможности для бизнеса на глобальных рынках. В результате программы вы получите возможность презентовать свой проект для международных инвесторов и локальных партнеров</Typography>
                <Button sx={{ background: "var(--07-af-91, #07AF91)", color: "white", paddingLeft: "40px", paddingRight: "40px" }}>Узнать подробнее</Button>
              </Box>
              <img src="src/assets/main/rocket 1.png" className='lg:hidden sm:block' />
            </aside>
          </section>

          {/* section 2 */}
          <section>
            <Box className="lg:pl-[210px] sm:text-center lg:text-start" sx={{ color: "#1178B2", fontSize: "36px", fontWeight: "800", paddingTop: "110px", paddingBottom: "35px" }}>Для кого мы?</Box>
            <Box className="sm:flex-wrap lg:flex-nowrap" sx={{ display: "flex", justifyContent: "center", gap: "32px" }}>
              <Card1 h1={"01"} h2={"IT проекты на стадии идеи"} h3={"Для стартапов, которые планируют привлечь международные инвестиции, протестировать спрос и запустить продукт"} />
              <Card1 h1={"02"} h2={"Инновационный бизнес"} h3={"Для стартапов, которые планируют привлечь международные инвестиции, протестировать спрос и запустить продукт"} />
              <Card1 h1={"03"} h2={"Корпорации"} h3={"Для стартапов, которые планируют привлечь международные инвестиции, протестировать спрос и запустить продукт"} />
            </Box>
          </section>

          {/* section 3 */}
          <section className='jk lg:my-[110px] sm:mt-[50px]'>
            <main className='mn '>
              <Box className="text-white lg:px-[200px] flex flex-col items-center gap-[20px] lg:py-[110px] sm:px-[12px] sm:py-[50px] ">
                <Box className="lg:text-[43px] sm:text-[28px] text-center lg:block sm:inline" sx={{ background: "#07AF91", padding: "10px", borderRadius: "8px" }}> Научитесь исследовать иностранные рынки и откройте новые возможности для своего бизнеса </Box>
                <Box className="text-center text-[24px]" sx={{}}>Наша команда поможет вам изучить рынки Ближнего Востока, Азии, Латинской Америки и Африки</Box>
                <Button sx={{ background: "linear-gradient(276deg, #016CA8 -7%, #61B5E4 77.16%);1x", padding: "15px", color: "white" }}>Получить консультацию</Button>
              </Box>
            </main>
          </section>

          {/* section 4 */}
          <section className='lg:py-[80px] sm:py-[40px]'>
            <Typography sx={{ color: "#1178B2", textAlign: "center", fontSize: "36px", paddingBottom: "50px" }}>С какими рынками мы работаем?</Typography>
            <Box className="flex items-center justify-center">
              <Box className="lg:w-[290px] py-[15px] sm:px-[3px] text-center border-[1px] border-[#CFDDEB] text-white" sx={{ background: "#88BBD8", }}>Ближний восток</Box>
              <Box className="lg:w-[290px] py-[15px] sm:px-[3px] text-center border-[1px] border-[#CFDDEB]" sx={{ background: "#EEF1F4", }}>Азия</Box>
              <Box className="lg:w-[290px] py-[15px]  sm:px-[3px] text-center border-[1px] border-[#CFDDEB]" sx={{ background: "#EEF1F4", }}>Латинская Америка</Box>
              <Box className="lg:w-[290px] py-[15px]  sm:px-[3px] text-center border-[1px] border-[#CFDDEB]" sx={{ background: "#EEF1F4", }}>Африка</Box>
            </Box>

            <main className='py-[40px] flex justify-between lg:px-[185px] lg:gap-[167px] sm:gap-[20px] sm:px-[50px] sm:flex-wrap'>
              {/* left */}
              <aside className='flex flex-col items-start gap-[30px]'>
                <div className='uppercase'>
                  <Typography sx={{ fontSize: "32px" }}>Чем интересен</Typography>
                  <Typography sx={{ color: "#07AF91", fontSize: "32px" }}>Рынок MENA:</Typography>
                </div>
                <p className='lg:w-[250px]'>ОАЭ, Саудовская Аравия, Израиль, Оман, Бахрейн, Катар, Тунис, Йемен, Египет, Алжир</p>
                <Button sx={{ borderRadius: "10px", background: "linear-gradient(276deg, #016CA8 -7%, #61B5E4 77.16%)", color: "white", padding: "15px" }}>Выйти на рынок</Button>
                <div className='flex items-center gap-[14px]'>
                  <img src="src/assets/Ellipse 527.png" alt="" />
                  <div>
                    <Typography sx={{ fontWeight: "800" }}>Фатима</Typography>
                    <Typography sx={{ color: "#727272", fontSize: "14px" }}>Менеджер по MENA</Typography>
                  </div>
                </div>
              </aside>

              {/* right */}
              <aside className='flex gap-[20px] sm:flex-wrap'>
                <div className='flex flex-col items-center gap-[20px]'>
                  <div className='d1 py-[65px] flex flex-col items-center text-center px-[30px] text-[#10101080] text-[16px]'><Card5 h1={">5,5 Млрд"} p={"Инвестиции pre-seed, seed"} /></div>
                  <div className='d1 py-[65px] flex flex-col items-center text-center px-[30px] text-[#10101080] text-[16px]'><Card5 h1={">300"} p={"Акселераторов, инкубаторов"} /></div>
                </div>
                <div className='flex flex-col items-center gap-[20px]'>
                  <div className='d1 py-[65px] flex flex-col items-center text-center px-[30px] text-[#10101080] text-[16px]'><Card5 h1={"73"} p={"Венчурных фонда"} /></div>
                  <div className='d2 py-[72px] flex flex-col items-center text-center px-[30px]  text-[white]'><Card5 img={"src/assets/Group 661.png"} h1={""} p={"Скачать отчетпо рынку MENA"} /></div>
                </div>
              </aside>
            </main>
          </section>

          {/* section 5 */}
          <section className='lg:py-[80px] sm:py-[50px] sm:px-[10px]'>
            <Typography sx={{ color: "#1178B2", textAlign: "center", fontSize: "36px", paddingBottom: "50px" }}>Об акселераторе IT бизнеса</Typography>
            <Box className="flex items-center justify-center gap-[40px] sm:flex-wrap sm:px-[12px]">
              <Card2 img={"src/assets/card2/3.png"} h1={"Месяца обучения"} />
              <Card2 img={"src/assets/card2/Vector (9).png"} h1={"Месяца обучения"} />
              <Card2 img={"src/assets/card2/Vector (10).png"} h1={"Месяца обучения"} sx={{ paddingTop: "10px" }} />
            </Box>
            <img src="src/assets/card2/Group 840.png" className="block m-[auto] pt-[20px]" />
          </section>


          {/* section 6 */}
          <section className='lg:px-[150px] sm:px-[10px] sm:py-[50px]'>
            <div className='flex flex-col gap-[20px]'>
              <div className='lg:text-start sm:text-center'><Typography sx={{ color: "#1178B2", fontSize: "36px", fontWeight: "700" }}>Программа акселератора</Typography></div>
              {/* 1 */}
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 1</span> Тенденции и тренды современного мира</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* 2 */}
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 2</span> Стартап подход к созданию международного IT продукта</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>


              {/* 3 */}
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 3</span> Бизнес моделирование и поиск Product Market Fit</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* 4 */}
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 4 </span>Определение рынка, поиск и исследование Целевой аудитории</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>


              {/* 5 */}
              <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 5</span> Что такое MVP и почему это важно</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* 6 */}
              <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 6</span> Unit экономика и финансовое моделирование</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* 7 */}
              <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 7</span> Что такое дорожная карта продукта?</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* 8 */}
              <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 8</span> Документы дя международных инвесторов</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* 9 */}
              <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography><span className='text-[#2A79C2] font-[800]'>Модуль 9</span> Открытие юридического лица. Возможности для стартапов</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 1. Куда движутся IT тренды? Аналитика Gartner, разбор отчетов консалтинговых компаний
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    Тема 2. Рынки Ближнего Востока, Азии, Латинской АмерикиТема
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography>
                    3. Что такое внутренние и внешние инновации? Как искать инновационные идеи?
                  </Typography>
                </AccordionDetails>
                <AccordionDetails sx={{ paddingLeft: "85px" }}>
                  <Typography sx={{ color: "#2A79C2" }}>
                    9 видео роликов, вебинар с приглашенным экспертом
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* 10 */}
              <Accordion expanded={expanded === 'panel10'} onChange={handleChange("panel10")}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography sx={{ color: "#2A79C2", fontWeight: "800" }}>Демо день </Typography>
                </AccordionSummary>
              </Accordion>
            </div>
            <Button sx={{ background: "linear-gradient(276deg, #016CA8 -7%, #61B5E4 77.16%)", color: "white", borderRadius: "10px", marginTop: "40px", padding: "10px" }}>Получить полную программу</Button>
          </section>

          {/* section 6/1 */}
          <section>
            <div className='jk4 p-[59px]'>
              <Box className="flex justify-center items-center">
                {/* left */}
                <aside className='lg:w-[555px] text-[white]  sm:hidden lg:flex flex-col gap-[15px] items-start'>
                  <h1 className='text-[40px]'>Попадите на радары инвесторов и партнеров</h1>
                  <p>В результате прохождения обучения мы создадим профили вашей компании на всех международных скаутинговых площадках</p>
                  <Button sx={{background: " var(--07-af-91, #07AF91)"}}>Записаться в акселератор</Button>
                </aside>


                {/* right */}
                <aside className='flex flex-col items-center gap-[20px]'>
                  <div className='flex items-center gap-[14px] sm:flex-wrap'>
                    <Card6 img={"src/assets/Снимок экрана 2022-09-08 в 1.50 (1).png"}/>
                    <Card6 img={"src/assets/Снимок экрана 2022-09-08 в 1.50 (2).png"}/>
                  </div>
                  <div  className='lg:flex items-center gap-[14px] sm:hidden'>
                    <Card6 img={"src/assets/Dealroom 1 (1).png"}/>
                    <Card6 img={"src/assets/unnamed 1 (1).png"}/>
                  </div>
                  <div  className='lg:flex items-center gap-[14px] sm:hidden'>
                    <Card6 img={"src/assets/f6s 3 (1).png"}/>
                    <Card6 img={"src/assets/B1i30JrIEAE3bt1 1 (1).png"}/>
                  </div>
                </aside>
              </Box>
            </div>
          </section>

          {/* section 7 */}
          <section className='lg:px-[150px] sm:px-[10px] sm:py-[50px] lg:text-start sm:text-center'>
            <Typography sx={{ color: "#1178B2", fontSize: "36px", fontWeight: "700" }}>Что вы получите в результате?</Typography>
            <Box className="flex flex-wrap justify-center gap-[20px] mt-[40px]">
              <Card1 h1={"01"} h2={"Документы по продукту"} h3={"Бизнес план, отчет по анализу рынка, маркетинговый план, unit экономика, список гипотез, проект MVP"} />
              <Card1 h1={"02"} h2={"Документы по продукту"} h3={"Бизнес план, отчет по анализу рынка, маркетинговый план, unit экономика, список гипотез, проект MVP"} />
              <Card1 h1={"03"} h2={"Документы по продукту"} h3={"Бизнес план, отчет по анализу рынка, маркетинговый план, unit экономика, список гипотез, проект MVP"} />
              <Card1 h1={"04"} h2={"Документы по продукту"} h3={"Бизнес план, отчет по анализу рынка, маркетинговый план, unit экономика, список гипотез, проект MVP"} />
              <Card1 h1={"05"} h2={"Документы по продукту"} h3={"Бизнес план, отчет по анализу рынка, маркетинговый план, unit экономика, список гипотез, проект MVP"} />
              <Card1 h1={"06"} h2={"Документы по продукту"} h3={"Бизнес план, отчет по анализу рынка, маркетинговый план, unit экономика, список гипотез, проект MVP"} />
            </Box>
          </section>

          {/* section 7/1 */}
          <section>
            <Card7 img={""}/>
          </section>
          {/* section 8 */}
          <section className='lg:px-[150px] sm:px-[10px] sm:py-[50px] lg:text-start sm:text-center'>
            <Typography sx={{ color: "#1178B2", fontSize: "36px", fontWeight: "700" }}>Что вы получите в результате?</Typography>
            <Box className="py-[40px]">
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide><Card3 img={"src/assets/card2/Ellipse 545.png"} h1={"Юрий Ким"} p={"Проведение исследования целевой аудитории позволит сформировать Product market fit"} /></SwiperSlide>
                <SwiperSlide><Card3 img={"src/assets/card2/Ellipse 546.png"} h1={"Эшли Абрамс"} p={"Проведение исследования целевой аудитории позволит сформировать Product market fit"} /></SwiperSlide>
                <SwiperSlide><Card3 img={"src/assets/card2/Ellipse 548.png"} h1={"Фатими Юсуф"} p={"Проведение исследования целевой аудитории позволит сформировать Product market fit"} /></SwiperSlide>
                <SwiperSlide><Card3 img={"src/assets/card2/Ellipse 544.png"} h1={"Майкл Донован"} p={"Проведение исследования целевой аудитории позволит сформировать Product market fit"} /></SwiperSlide>
              </Swiper>
            </Box>
          </section>

          {/* section 9 */}
          <section className='lg:px-[150px] sm:px-[10px] sm:py-[50px] lg:text-start sm:text-center'>
            <Typography sx={{ color: "#1178B2", fontSize: "36px", fontWeight: "700" }}>Наши партнеры</Typography>
            <Box className="py-[40px] flex flex-wrap justify-center gap-[25px]">
              <Card4 img={"src/assets/card2/Снимок экрана 2022-09-08 в 1.50.png"} />
              <Card4 img={"src/assets/main/Dealroom 1.png"} />
              <Card4 img={"src/assets/main/Снимок экрана 2022-07-01 в 5.07 1.png"} />
              <Card4 img={"src/assets/main/Снимок экрана 2022-07-01 в 5.09 1.png"} />
              <Card4 img={"src/assets/main/Снимок экрана 2022-11-19 в 7.52.png"} />
              <Card4 img={"src/assets/main/png-clipart-in5-tech-entrepreneurship-tecom-group-startup-company-technology-others-miscellaneous-text-removebg-preview 1.png"} />
              <Card4 img={"src/assets/main/Снимок экрана 2022-11-19 в 7.54.png"} />
              <Card4 img={"src/assets/main/header-logo 1.png"} />
            </Box>
          </section>




          {/* //TODOLIST */}
          {/* section 10 todolist */}
          <section>
          <button className='bg-[hsl(186,43%,23%)] lg:mx-[150px] sm:mx-[5px]  lg:text-start sm:text-center py-[5px] px-[15px] rounded-[5px] text-white mb-[30px]' onClick={toggleList}>Show Todolist</button>
            {/* table */}
            {showList &&
              <TableContainer sx={{ width: "95%", margin: "0 auto", paddingBottom: "50px", paddingTop: "10px" }}>
                <button className='bg-[hsl(186,43%,23%)] py-[5px] px-[15px] rounded-[5px] text-white mb-[30px]' onClick={() => { handleClickOpenAdd() }}>New +</button>
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>Name</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>City</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>Status</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>Phone</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>Remove</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>Edit</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todo.map((e) => (
                      <StyledTableRow>
                        <StyledTableCell align="right" sx={{ textAlign: "center" }}>{e.name}</StyledTableCell>
                        <StyledTableCell align="right" sx={{ textAlign: "center" }}>{e.city}</StyledTableCell>
                        <StyledTableCell align="right" sx={{ textAlign: "center" }}><Button sx={{ width: "100px", color: "black", borderRadius: "none", backgroundColor: e.status == 'true' ? "green" : "rgba(116, 137, 152, 1)", color: "white" }} onClick={() => comUser(e.id)} >{e.status == "true" ? "Active" : "Inactive"}</Button></StyledTableCell>
                        <StyledTableCell align="right" sx={{ textAlign: "center" }}>{e.number}</StyledTableCell>
                        <StyledTableCell align="right" sx={{ textAlign: "center" }}><button className='bg-[red] px-[25px] text-[white] p-[8px] rounded-[10px]' onClick={() => deleteUser(e.id)}>Delete</button></StyledTableCell>
                        <StyledTableCell align="right" sx={{ textAlign: "center" }}><button className='bg-[green] px-[20px] text-[white] p-[8px] rounded-[10px]' onClick={() => {
                          handleClickOpen()
                          setIdx(e.id)
                          setEditName(e.name)
                          setEditCity(e.city)
                          setEditNumber(e.number)
                        }}>Edit</button></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }

          </section>
        </main>
      </ThemeProvider>
      {/* //modal */}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Edit User"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ display: "flex", flexDirection: "column", gap: "30px" }} id="alert-dialog-description">
              <TextField value={editName} onChange={(e) => setEditName(e.target.value)} ></TextField>
              <TextField value={editNumber} onChange={(e) => setEditNumber(e.target.value)} ></TextField>
              <TextField value={editCity} onChange={(e) => setEditCity(e.target.value)}></TextField>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Concel</Button>
            <Button onClick={() => {
              let obj = {
                name: editName,
                number: editNumber,
                city: editCity
              }
              editUser(idx, obj)
              handleClose()
            }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>



      {/* modal add */}
      {/* //modal */}
      <React.Fragment>
        <Dialog
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add User"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ display: "flex", flexDirection: "column", gap: "30px" }} id="alert-dialog-description">
              <TextField value={addName} onChange={(e) => setAddName(e.target.value)} ></TextField>
              <TextField value={addNumber} onChange={(e) => setAddNumber(e.target.value)}></TextField>
              <TextField value={addCity} onChange={(e) => setAddCity(e.target.value)}></TextField>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Concel</Button>
            <Button onClick={() => {
              let user = {
                name: addName,
                city: addCity,
                number: addNumber,
              }
              setAddName("")
              setAddCity("")
              setAddNumber("")
              addUser(user)
              handleCloseAdd()
            }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default App