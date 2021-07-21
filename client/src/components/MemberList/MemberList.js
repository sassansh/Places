import "./MemberList.css";

import Member from "../Member/Member";

function MemberList() {
  const processedMemberData = [
      {
        user: {
          user_id: "1-2-3-4",
          avatarURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
          name: "Sally McGee"
        },
        group: {
          group_id: "4-5-6-7",
          avatarURL: "https://i0.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2016/09/iStock-119483507.jpg?resize=1024%2C683&ssl=1",
          name: "People Who Eat Food"
        }
      },
      {
        user: {
          user_id: "2-4-6-8",
          avatarURL: "https://i2.wp.com/decider.com/wp-content/uploads/2020/06/adventure-time-distant-lands-bmo.jpg?quality=80&strip=all&ssl=1",
          name: "Bea Mo"
        },
        group: {
          group_id: "4-5-6-7",
          avatarURL: "https://i0.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2016/09/iStock-119483507.jpg?resize=1024%2C683&ssl=1",
          name: "People Who Eat Food"
        }
      }
  ];

  let memberList = processedMemberData.map((member) => (
    <Member user={member.user} group={member.group} />
  ));

  return (
    <div>
      <ul>{memberList}</ul>
    </div>
  );
}

export default MemberList;
