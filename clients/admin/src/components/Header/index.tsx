import React from "react";

import { useAuth } from "~/hooks/auth";

import { Container, Content, Link, ButtonLogout } from "./styles";

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <Link to="/dashboard">Dashboard</Link>
        <div>
          <Link to="/profile">Atualizar perfil</Link>
          <ButtonLogout onClick={signOut}>Sair</ButtonLogout>
        </div>
      </Content>
    </Container>
  );
};

export default Header;
