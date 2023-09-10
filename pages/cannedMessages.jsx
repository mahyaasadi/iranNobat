import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Loading from "components/loading/loading";
import CannedMessagesListTable from "components/dashboard/cannedMessages/cannedMessagesListTable";
import AddMessageModal from "components/dashboard/cannedMessages/addMessageModal";
import EditMessageModal from "components/dashboard/cannedMessages/editMessageModal";
import { QuestionAlert } from "class/AlertManage.js";

let CenterID = Cookies.get("CenterID");

export const getStaticProps = async () => {
  const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
  const Menus = await data.json();
  return { props: { Menus } };
};

const CannedMessages = ({ Menus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [messagesData, setMessagesData] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageType, setMessageType] = useState("Text");
  const [editedMessage, setEditedMessage] = useState("");

  const handleMessageTextInput = (e) => setMessageText(e.target.value);
  const handleMessageTitleInput = (e) => setMessageTitle(e.target.value);

  //reset form inputs
  const reset = () => {
    setMessageText("");
    setMessageTitle("");
  };

  //get CannedMessages list
  const getCannedMessages = () => {
    let url = `Center/getCannedMessages/${CenterID}`;

    axiosClient.get(url).then(function (response) {
      setMessagesData(response.data.result.CannedMessages);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    try {
      getCannedMessages();
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  }, []);

  // Add Message
  const addMessage = (e) => {
    e.preventDefault();

    let url = "Center/addCannedMessages";
    let data = {
      CenterID: CenterID,
      Text: messageText,
      Title: messageTitle,
      Type: "Text",
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setMessagesData([...messagesData, response.data]);
        $("#addMessageModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit Message
  const editMessage = (e) => {
    e.preventDefault();

    let url = "Center/EditCannedMessages";
    let formData = new FormData(e.target);

    const formProps = Object.fromEntries(formData);
    let Data = {
      CenterID: CenterID,
      CMID: formProps.EditMessageID,
      Text: formProps.EditMessageText,
      Title: formProps.EditMessageTitle,
      Type: "Text",
    };

    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditMessageID, response.data);
        $("#editMessageModal").modal("hide");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateItem = (id, newArr) => {
    let index = messagesData.findIndex((x) => x._id === id);

    let g = messagesData[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setMessagesData([
        ...messagesData.slice(0, index),
        g,
        ...messagesData.slice(index + 1),
      ]);
  };

  const updateMessage = (data) => {
    setEditedMessage(data);
    $("#editMessageModal").modal("show");
  };

  // Delete Message
  const deleteMessage = async (id) => {
    let result = await QuestionAlert(
      "حذف پیام !",
      "آیا از حذف پیام مطمئن هستید"
    );

    if (result) {
      let url = "Center/DeleteCannedMessages";
      let data = {
        CenterID: CenterID,
        CMID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function (response) {
          setMessagesData(messagesData.filter((a) => a._id !== id));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Head>
        <title>پیام های پیش فرض</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addMessageModal"
                  className="btn btn-primary btn-add font-14"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- CannedMessages List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title font-16">
                        لیست پیام های پیش فرض
                      </h5>
                    </div>
                    <div className="col-auto d-flex flex-wrap">
                      <div className="form-custom me-2">
                        <div
                          id="tableSearch"
                          className="dataTables_wrapper"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <CannedMessagesListTable
                    data={messagesData}
                    updateMessage={updateMessage}
                    deleteMessage={deleteMessage}
                  />
                )}
              </div>
              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>

      <AddMessageModal
        addMessage={addMessage}
        messageText={messageText}
        messageTitle={messageTitle}
        handleMessageTextInput={handleMessageTextInput}
        handleMessageTitleInput={handleMessageTitleInput}
      />

      <EditMessageModal
        data={editedMessage}
        editMessage={editMessage}
        messageText={messageText}
        messageTitle={messageTitle}
        handleMessageTextInput={handleMessageTextInput}
        handleMessageTitleInput={handleMessageTitleInput}
      />
    </>
  );
};
export default CannedMessages;
