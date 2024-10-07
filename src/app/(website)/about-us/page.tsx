// AboutUs.tsx
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

export const metadata = {
  title: "About us",
};

const teamMembers = [
  {
    name: "Rahul Ahmed",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/9.jpg", // Placeholder image
    bio: "Rahul has over 15 years of experience in technology and entrepreneurship, leading the company with a vision of innovation.",
  },
  {
    name: "Shakib Al Hasan",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/men/7.jpg", // Placeholder image
    bio: "Shakib has a strong background in digital marketing and brand management, ensuring the company's visibility and growth.",
  },
  {
    name: "Imran Khan",
    role: "Head of Operations",
    image: "https://randomuser.me/api/portraits/men/15.jpg", // Placeholder image
    bio: "Imran is responsible for streamlining operations and ensuring efficiency within the organization.",
  },
];

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        About Us
      </Typography>
      <div className="bg-white shadow-md border p-5 mb-5">
        <Typography variant="body1" align="center" paragraph>
          Our mission is to empower the Bangladeshi community through technology
          and innovation. We strive to make a positive impact in the lives of
          our users by providing exceptional services and solutions.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Our vision is to be a leading organization in the tech industry of
          Bangladesh, known for our integrity, quality, and commitment to
          customer satisfaction.
        </Typography>
      </div>
      <Typography variant="h4" align="center" gutterBottom>
        Meet Our Team
      </Typography>
      <Grid container spacing={2}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt={member.name}
                height="151"
                image={member.image}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
                <h2 className="line-clamp-3 overflow-ellipsis text-sm">
                  {member.bio}
                </h2>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;
