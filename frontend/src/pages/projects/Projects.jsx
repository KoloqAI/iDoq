import { Button, Table, Typography, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSessionStore } from "../../store/session-store";
import { useProjectsStore } from "../../store/projects-store";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import "./Projects.css";

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { sessionDetails } = useSessionStore();
  const { projects, loading, fetchProjects, createProject } =
    useProjectsStore();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchProjects(axiosPrivate, sessionDetails.orgId);
  }, [sessionDetails.orgId]);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Project Detail",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
  ];

  const handleCreateProject = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await createProject(axiosPrivate, sessionDetails.orgId, values);
      message.success("Project created successfully");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create project");
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="projects-layout">
      <div className="projects-header">
        <Typography.Title level={4}>Projects</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateProject}
        >
          Create New Project
        </Button>
      </div>
      <div className="projects-content">
        <Table
          columns={columns}
          dataSource={projects}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title="Create New Project"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Project Description"
            rules={[
              { required: true, message: "Please enter project description" },
            ]}
          >
            <Input.TextArea placeholder="Enter project description" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Project Type"
            rules={[{ required: true, message: "Please select project type" }]}
          >
            <Input placeholder="Enter project type" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export { Projects };
