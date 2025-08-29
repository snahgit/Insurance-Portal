import { useMemo } from "react";
import { Box, Card } from "@mantine/core";
import { Breadcrumb } from "../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../common/PageTopBarAndFilter";
import { PagePagination } from "../../../common/PagePagination";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { ReportList } from "./sections/list/ReportList";

export const Report = () => {
  const loaderData = useLoaderData();
  const filterState = useSelector((state: RootState) => state.pageTopBarAndFilter);

  const allStaffMembers = [
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    },
    {
      "id": 1,
      "appointmentId": "SNAH123456",
      "planName": "Test name",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "reports": [
        {
          "report": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "prescription": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "surgery": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "consultant": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "testResult": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ],
          "therapy": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "treatment": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./1.jpg"
            }
          ],
          "invoice": [
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            },
            {
              "path": "https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480",
              "relativePath": "./2.jpg"
            }
          ]
        }
      ]
    }
  ]
  const staffMemberList = useMemo(() => {
    let filtered = [...allStaffMembers];
    if (filterState.filter.textFilter) {
      const textFilter = filterState.filter.textFilter.toLowerCase();
      filtered = filtered.filter(dept =>
        dept.planName.toLowerCase().includes(textFilter) || ''
      );
    }
    return filtered;
  }, [allStaffMembers, filterState.filter]);

  const topBarAndFilter = {
    type: loaderData.type,
    title: "Create Report",
    heading: "Comprehensive List of All Claim Reports",
    viewMode: "grid",
    whatNeeded: {
      isViewModeNeeded: true,
      isFilterNeeded: true,
      isAddNeeded: true,
    },
    addNeededRedirectTo: "form",
    addBtnText: "Create Report"
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: "Report List",
            items: [
              { title: "Manage Report", href: "#" },
              { title: "Report List", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <ReportList dataPass={{ staffMemberList }} />
          <PagePagination dataPass={{ total: 100 }} />
        </Card>
      </Box>
    </Box>
  );
};