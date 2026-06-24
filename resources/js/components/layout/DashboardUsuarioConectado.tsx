import { UserOutlined } from '@ant-design/icons';
import { Link, router, usePage } from '@inertiajs/react';
import { Dropdown, Avatar, Button, Space, Typography } from 'antd';

const { Text } = Typography;

export default function DashboardUsuarioConectado() {
  const { auth } = usePage().props;
  const user = auth.user;
  const darkMode = true;

  const fullName = user?.name || user?.email || 'Usuario';
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');

  const onMenuClick = ({ key }: { key: string }) => {
    if (key !== 'logout') {
return;
}

    router.post('/logout');
  };

  return (
    <>
      {user ? (
        <Dropdown
          menu={{
            onClick: onMenuClick,
            items: [
              {
                key: 'logout',
                label: 'Cerrar sesion',
              },
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" className="h-auto px-2">
            <Space size={10}>
              <Avatar
                size={38}
                style={{
                  backgroundColor: darkMode ? '#3b82f6' : '#1d4ed8',
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                {initials || 'U'}
              </Avatar>
              <div className="text-right leading-tight">
                <Text strong style={{ color: darkMode ? '#f5f5f5' : '#0f172a' }}>
                  {fullName}
                </Text>
              </div>
            </Space>
          </Button>
        </Dropdown>
      ) : (
        <Link href="/iniciar_sesion" className="hidden h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm !text-white/80 transition hover:!border-green-500/60 hover:!text-green-400 md:flex cursor-pointer">
          <UserOutlined />
          Iniciar sesión
        </Link>
      )}
    </>
  )
}
