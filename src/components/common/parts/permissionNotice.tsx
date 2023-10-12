import React from "react";

type PermissionNoticeProps = {
  handleLinkToSetting: () => void;
};

export default function PermissionNotice(props: PermissionNoticeProps) {
  return (
    <div className="mt-4 mb-8 flex items-center space-x-2 border-l-8 border-red-600 rounded-md bg-gray-100 p-1">
      <div>
        <svg
          className="w-6 h-6 text-red-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
      </div>
      <div>
        First, Open Anki.
        <br />
        Please download AnkiConnect from Add-ons and re-authenticate from
        <span
          onClick={() => props.handleLinkToSetting()}
          className="border-b-2 border-blue-500 text-blue-500 cursor-pointer ml-1"
        >
          setting
        </span>
        .
      </div>
    </div>
  );
}
