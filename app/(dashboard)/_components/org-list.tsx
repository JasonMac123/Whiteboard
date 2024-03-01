"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { OrganizationIcon } from "./org-image";

export const OrganizationList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) {
    return null;
  }

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((item) => (
        <OrganizationIcon
          key={item.organization.id}
          id={item.organization.id}
          name={item.organization.name}
          imageUrl={item.organization.imageUrl}
        />
      ))}
    </ul>
  );
};
