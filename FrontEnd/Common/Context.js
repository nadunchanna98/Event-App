import { createContext, useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View , TextInput} from 'react-native'

import BASE_URL from './BaseURL';
import axios from 'axios';
import ShareEvent from "../Screens/Admin/ShareEvent";

export const NewContext = createContext();

const Context = ({ children }) => {

  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [marks, setMarks] = useState([]);   // total marks
  const [post, setPost] = useState([]);   //for the summary
  const [newPost, setNewPost] = useState([]);  //for the upcoming events
  const [date, setDate] = useState();
  const [event, setEvent] = useState("");
  const [darkTheme, setDarkTheme] = useState(true);
  const [tokens, setTokens] = useState([]);

  const getTokens = () => {
    axios.get(`${BASE_URL}users/token`)
      .then(res => {
        setTokens(res.data.map(item => item.token));
        // console.log("tokens--", tokens);
      })
      .catch(err => {
        console.log(err);
      })
    return () => {
      setTokens([]);
    }
  }

  //refresh
  const pullMe = () => {

    setRefresh(true);
    fetchMarks();
    fetchDate();
    getPost();
    getNewPost();

    setTimeout(() => {
      setRefresh(false);
    }, 4000);
  }


  const DeletePost = (id) => {

    console.log(id);
    axios.delete(`${BASE_URL}futureevents/delete/${id}`)
      .then(res => {
        console.log("success");
        getNewPost();
      })
      .catch(err => {
        console.log(err);
      })
  }


  //for marks
  const fetchMarks = () => {

    axios.get(`${BASE_URL}teams/total`)
      .then(res => {
        setMarks(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    return () => {
      setMarks([]);
    }

  }

  //for latest date
  const fetchDate = () => {

    axios.get(`${BASE_URL}latest/`)
      .then(res => {
        setDate(res.data[0].date);
        setEvent(res.data[0].event);
      })
      .catch(err => {
        console.log(err);                  //clean up function
      })
    return () => {
      setDate();
    }

  }

  //for summary
  const getPost = () => {
    axios.get(`${BASE_URL}pastevents`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.log(err);                  //clean up function
      })
    return () => {
      setPost([]);
    }

  }

  //for upcoming events
  const getNewPost = () => {
    axios.get(`${BASE_URL}futureevents`)
      .then(res => {
        setNewPost(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    return () => {
      setNewPost([]);
    }
  }


  return (

    <NewContext.Provider value={
      {

        darkTheme,
        setDarkTheme,
        index,
        setIndex,
        fetchMarks,
        marks,
        refresh,
        pullMe,
        date,
        setDate,
        event,
        fetchDate,
        getPost,
        post,
        getNewPost,
        newPost,
        DeletePost,
        getTokens,
        tokens,
 
      
      }}>

      {children}

    </NewContext.Provider>
  )
};

export default Context;