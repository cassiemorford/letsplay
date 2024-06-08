import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";
import Link from "next/link";
import React from "react";

const organizationHeaders = [
  { displayValue: "Organization Name", dbValue: "name" },
  { displayValue: "Join Code", dbValue: "code" },
  { displayValue: "Member Count", dbValue: "members" },
];

const OrganizationsPage = async () => {
  const allOrganizations = await prisma.organization.findMany({
    include: {
      _count: { select: { members: true } },
    },
  });

  return (
    <div className="px-4">
      <Table className="rounded-t border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            {organizationHeaders.map((oh) => (
              <TableHead key={oh.dbValue}>{oh.displayValue}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrganizations.map((o) => (
            <>
              <TableRow key={o.id}>
                <TableCell className="font-bold underline">
                  <Link href={`/admin/organizations/${o.id}`}>{o.name}</Link>
                </TableCell>
                <TableCell>{o.code}</TableCell>
                <TableCell>{o._count.members}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrganizationsPage;
