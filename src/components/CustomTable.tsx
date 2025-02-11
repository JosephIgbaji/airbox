import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, GraduationCap } from "lucide-react";

const students = [
  {
    id: "35013",
    name: "Janet",
    avatar: "/placeholder.svg?height=40&width=40",
    class: "III",
    section: "A",
    marks: 89,
    exam: "Quartely",
    status: "Pass",
  },
  {
    id: "35013",
    name: "Joann",
    avatar: "/placeholder.svg?height=40&width=40",
    class: "IV",
    section: "B",
    marks: 88,
    exam: "Practical",
    status: "Pass",
  },
  {
    id: "35010",
    name: "Gifford",
    avatar: "/placeholder.svg?height=40&width=40",
    class: "I",
    section: "B",
    marks: 21,
    exam: "Mid Term",
    status: "Pass",
  },
  {
    id: "35009",
    name: "Lisa",
    avatar: "/placeholder.svg?height=40&width=40",
    class: "II",
    section: "B",
    marks: 31,
    exam: "Annual",
    status: "Fail",
  },
  {
    id: "35015",
    name: "Riana",
    avatar: "/placeholder.svg?height=40&width=40",
    class: "III",
    section: "A",
    marks: 89,
    exam: "Quartely",
    status: "Pass",
  },
  {
    id: "35013",
    name: "Angelo",
    avatar: "/placeholder.svg?height=40&width=40",
    class: "IV",
    section: "B",
    marks: 88,
    exam: "Practical",
    status: "Fail",
  },
] as const;

interface tableProps {
  title?: string;
  data?: any;
}
export default function CustomTable({ title, data }: tableProps) {
  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle>{title}</CardTitle>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <SelectValue placeholder="All Classes" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="1">Class I</SelectItem>
                <SelectItem value="2">Class II</SelectItem>
                <SelectItem value="3">Class III</SelectItem>
                <SelectItem value="4">Class IV</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <SelectValue placeholder="All Exams" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="practical">Practical</SelectItem>
                <SelectItem value="midterm">Mid Term</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data || students} />
        </CardContent>
      </Card>
    </div>
  );
}
