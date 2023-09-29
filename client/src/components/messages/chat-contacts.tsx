import { User, useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Contacts = ({ changeChat }) => {
  const { user } = useAuth();
  const { users } = useData();
  const [currentSelected, setCurrentSelected] = React.useState(undefined);

  const changeCurrentChat = (index, contact: User) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Message</CardTitle>
        <CardDescription>
          Discuter avec les personnes
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="flex flex-col items-center divide-y divide-gray-200">
          {users
            .filter((contact) => contact._id !== user._id)
            .map((contact, index) => (
              <li
                key={contact._id}
                className={`cursor-pointer px-6 py-4 flex w-full hover:bg-gray-50 ${
                  index === currentSelected ? "bg-gray-100" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className=" font-medium text-gray-900 truncate ">
                      {contact.firstname} {contact.surname}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export { Contacts };
