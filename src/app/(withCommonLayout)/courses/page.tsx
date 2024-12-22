"use client";
import LoadingPage from "@/app/loading";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import { useGetAllAuthorsQuery } from "@/redux/features/admin/authorManagementApi";
import { useDebounced } from "@/redux/hooks";
import { IAuthor, IDepartment } from "@/type";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Pagination,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState, useMemo, useEffect, use } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetAllCoursesQuery } from "@/redux/features/admin/courseManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import Link from "next/link";
import DohaButton from "@/components/ui/DohaButton";
import CoursePrice from "./components/CoursePrice";
import NotMatch from "@/components/ui/NotMatch";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/admin/offeredCourseManagementApi";

const CoursePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: departments, isLoading: departmentsLoading } =
    useGetAllAcademicDepartmentsQuery({});
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 9,
  });

  const [filter, setFilter] = useState<Record<string, any>>({});
  const [selectedItem, setSelectedItem] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get("departmentId");
    if (departmentId) {
      setFilter(() => ({ department: departmentId }));
    }
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, []);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const handleRemoveFilter = () => {
    setFilter({});
    setSelectedItem("");
    setPaginationModel((prev) => ({ ...prev, page: 1 }));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Build query dynamically
  const query = useMemo(() => {
    const queryObj: Record<string, any> = {
      page: paginationModel.page,
      limit: paginationModel.pageSize,
    };

    if (debouncedTerm) {
      queryObj["searchTerm"] = debouncedTerm;
    }

    if (filter.department) {
      queryObj["academicDepartment"] = filter?.department;
    }

    return queryObj;
  }, [paginationModel, debouncedTerm, filter]);

  const { data: courses, isLoading: coursesLoading } =
    useGetAllOfferedCoursesQuery(query);

  if (departmentsLoading || coursesLoading) return <LoadingPage />;

  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
      <DohaContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <IconButton
            className="lg:hidden z-10 absolute "
            onClick={handleToggleSidebar}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {selectedItem ? (
            <Title title={selectedItem} />
          ) : (
            <Title title={"কোর্স সমূহ"} />
          )}

          <TextField
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            placeholder="Search course"
          />
        </Stack>

        <div className="flex min-h-screen lg:gap-8 md:gap-6 gap-5">
          {/* Sidebar for menu */}
          {isSidebarOpen && (
            <aside
              className={`translate-x-0 bg-white p-5 fixed top-0 left-0  shadow-lg transition-transform duration-300 z-20 w-64 min-h-screen lg:w-80
            `}
            >
              {/* Categories */}
              <div className="mb-6 ">
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h5">Filter By</Typography>
                  <IconButton
                    className="text-end"
                    onClick={handleToggleSidebar}
                  >
                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                </div>
                <Typography variant="h6">DEPARTMENT</Typography>
                <Divider />
                <ul className="space-y-1 mt-3 max-h-[250px] overflow-y-auto mb-4">
                  {departments &&
                    departments?.departments?.map((department: IDepartment) => (
                      <li key={department?._id} className="flex items-center">
                        <Radio
                          size="medium"
                          checked={filter.department === department._id}
                          onChange={() => {
                            handleRemoveFilter();
                            setFilter({ department: department?._id });
                            setSelectedItem(department.name);
                          }}
                        />
                        <span>{department?.name}</span>
                      </li>
                    ))}
                </ul>
                <Button
                  className="mt-10 w-full flex justify-center items-center gap-2"
                  onClick={handleRemoveFilter}
                >
                  <Delete /> Clear
                </Button>
              </div>

              {/* Authors */}
              {/* <div className="mb-6 mt-8">
                <Typography variant="h6">AUTHORS</Typography>
                <Divider />
                <ul className="space-y-1 mt-3 max-h-[250px] overflow-y-auto mb-5">
                  {authors?.Authors?.map((author: IAuthor) => (
                    <li key={author._id} className="flex items-center">
                      <Radio
                        size="medium"
                        checked={filter.authors === author._id}
                        onChange={() => {
                          handleRemoveFilter();
                          setFilter({ authors: author._id });
                          setSelectedItem(author.name);
                        }}
                      />
                      <span>{author.name}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-10 w-full flex justify-center items-center gap-2"
                  onClick={handleRemoveFilter}
                >
                  <Delete /> Clear
                </Button>
              </div> */}
            </aside>
          )}

          <aside className={`w-64 hidden lg:flex flex-col gap-2`}>
            {/* Categories */}
            <div className="mb-6">
              <Typography variant="h6">DEPARTMENT</Typography>
              <Divider />
              <ul className="space-y-1 mt-3 max-h-[250px] overflow-y-auto mb-4">
                {departments &&
                  departments?.departments?.map((department: IDepartment) => (
                    <li key={department._id} className="flex items-center">
                      <Radio
                        size="medium"
                        checked={filter.department === department._id}
                        onChange={() => {
                          handleRemoveFilter();
                          setFilter({ department: department._id });
                          setSelectedItem(department?.name);
                        }}
                      />
                      <span>{department?.name}</span>
                    </li>
                  ))}
              </ul>
              <Button
                className="mt-10 w-full flex justify-center items-center gap-2"
                onClick={handleRemoveFilter}
              >
                <Delete /> Clear
              </Button>
            </div>
          </aside>

          {/* Overlay for Small/Medium Devices */}
          {isSidebarOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 lg:hidden"
              onClick={handleToggleSidebar}
            ></div>
          )}

          {/* Content */}
          <main className="flex-1">
            {courses && courses?.offeredCourses?.length > 0 ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 min-h-[300px]">
                {courses?.offeredCourses?.map((course) => (
                  <Card
                    key={course?._id}
                    sx={{
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      ":hover": {
                        border: "1px solid #0F473C",
                      },
                    }}
                  >
                    <Image
                      width={600}
                      height={400}
                      src={course?.course?.courseImage}
                      alt="course image"
                      className="border-b border-gray-300"
                    />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      px={1}
                      py={2}
                    >
                      <Box mt={0}>
                        <CoursePrice price={course?.course?.fee?.total} />
                      </Box>
                      <Link href={`/courses/${course?.course?._id}`}>
                        <DohaButton btnTitle="রেজিস্টার" />
                      </Link>
                    </Stack>
                  </Card>
                ))}
              </div>
            ) : (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <NotMatch data={"Course"} />
              </Stack>
            )}

            {/* Pagination */}
            <Stack
              spacing={5}
              mt={4}
              direction="row"
              justifyContent="end"
              alignItems="center"
              borderRadius="7px"
            >
              <Typography>Page: {paginationModel.page}</Typography>
              <Pagination
                count={courses?.meta?.totalPage || 0}
                page={paginationModel.page}
                onChange={handlePaginationChange}
              />
            </Stack>
          </main>
        </div>
      </DohaContainer>
    </Box>
  );
};

export default CoursePage;
