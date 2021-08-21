import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { AddServices } from "./addServices";
import ServicesList from "./servicesList";
const ServicesOffered = () => {
  const [stylist, setStylist] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const stylistId = useParams();
  const URL = `${process.env.REACT_APP_BACKEND}/api`;

  useEffect(() => {
    const fetchStylist = async () => {
      await axios.get(`${URL}/stylists/${stylistId.id}`).then((res) => {
        const stylistData = res.data.stylist;
        setStylist(stylistData);
        setIsLoading(false);
      });
    };
    fetchStylist();
  }, [stylist]);
  return (
    <div className="text-center row justify-content-center align-items-center h-100 overflow-hidden">
      <div className="col">
        <ServicesList id={stylist.id} />
        <AddServices id={stylist.id} />
      </div>
    </div>
  );
};
export default ServicesOffered;
