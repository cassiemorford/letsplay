import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Organization, Prisma, User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type UserWithOrganization = Prisma.UserGetPayload<{
  include: { organization: true };
}>;

interface Props {
  users: User[] | UserWithOrganization[];
  includeOrganizationColumn?: boolean;
}

const UserTable = ({ users, includeOrganizationColumn = false }: Props) => {
  const userTableHeaders = [
    { displayValue: "Name", dbValue: "name" },
    { displayValue: "Email", dbValue: "email" },
    { displayValue: "Role", dbValue: "role" },
  ];

  if (includeOrganizationColumn) {
    userTableHeaders.push({
      displayValue: "Organization",
      dbValue: "organization",
    });
  }

  return (
    <div>
      <Table className="rounded-t border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            {userTableHeaders.map(({ displayValue, dbValue }) => (
              <TableHead key={dbValue}>{displayValue}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <>
              <TableRow key={u.id}>
                <TableCell>
                  <Link href={`/admin/users/${u.id}`}>{u.name}</Link>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                {includeOrganizationColumn && (
                  <TableCell>
                    <Link
                      href={`/admin/organizations/${
                        (u as UserWithOrganization).organization?.id
                      }`}
                    >
                      {(u as UserWithOrganization).organization?.name}
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;