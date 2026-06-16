import { Button, Input } from 'antd';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function PublicNewsletterBar() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('Gracias por suscribirte.');
        setEmail('');
    };

    return (
        <section className="public-newsletter" aria-label="Boletín semanal">
            <form className="public-newsletter-form" onSubmit={handleSubmit}>
                <div className="public-newsletter-heading">
                    <span className="public-newsletter-icon" aria-hidden="true">
                        <Mail size={34} strokeWidth={1.4} />
                    </span>
                    <h2>Únete a nuestro boletín semanal</h2>
                </div>

                <label className="public-newsletter-field">
                    <span>Correo electrónico</span>
                    <Input
                        value={email}
                        type="email"
                        required
                        className="public-newsletter-input"
                        aria-label="Correo electrónico"
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setMessage('');
                        }}
                    />
                </label>

                <Button
                    htmlType="submit"
                    type="default"
                    size="large"
                    className="public-newsletter-submit"
                >
                    Suscribirme
                </Button>

                {message && (
                    <p className="public-newsletter-feedback">{message}</p>
                )}
            </form>
        </section>
    );
}
