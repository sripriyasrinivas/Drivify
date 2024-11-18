import React from 'react';
import SelectState from './SelectState';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz"
import Instructions from "./Instructions";
import Apply from "./ApplicationForm";
import Payment from "./Payment";
import ApplicationDL from './ApplicationDL';
import ConfirmDL from './ConfirmDL';
import Print from "./PrintApplication"
import BookAppointment from './BookAppointment';
import PrintDL from './PrintDL';

const App = () => {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectState />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/ApplicationDL" element={<ApplicationDL />} />
        <Route path="/ConfirmDL" element={<ConfirmDL />} />
        <Route path="/print" element={<Print />}/>
        <Route path="/bookdl" element={<BookAppointment />}/>
        <Route path="/printdl" element={<PrintDL />}/>
      </Routes>
    </Router>
    );
};

export default App;
