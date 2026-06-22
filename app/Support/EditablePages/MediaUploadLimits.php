<?php

namespace App\Support\EditablePages;

class MediaUploadLimits
{
    private const DESIRED_MAX_SIZE_MEGABYTES = 64;

    private const REQUEST_OVERHEAD_MEGABYTES = 2;

    public static function maxFileSizeMegabytes(): int
    {
        $postMaxMegabytes = self::iniSizeToMegabytes('post_max_size');
        $uploadMaxMegabytes = self::iniSizeToMegabytes('upload_max_filesize');

        if ($postMaxMegabytes !== PHP_INT_MAX) {
            $postMaxMegabytes = max(1, $postMaxMegabytes - self::REQUEST_OVERHEAD_MEGABYTES);
        }

        return min(
            self::DESIRED_MAX_SIZE_MEGABYTES,
            $postMaxMegabytes,
            $uploadMaxMegabytes,
        );
    }

    public static function maxFileSizeKilobytes(): int
    {
        return self::maxFileSizeMegabytes() * 1024;
    }

    private static function iniSizeToMegabytes(string $key): int
    {
        $bytes = self::parsePhpIniSize((string) ini_get($key));

        if ($bytes <= 0) {
            return PHP_INT_MAX;
        }

        return max(1, (int) floor($bytes / 1024 / 1024));
    }

    private static function parsePhpIniSize(string $value): int
    {
        $value = trim($value);

        if ($value === '') {
            return 0;
        }

        $unit = strtolower($value[-1]);
        $number = (float) $value;

        return match ($unit) {
            'g' => (int) ($number * 1024 * 1024 * 1024),
            'm' => (int) ($number * 1024 * 1024),
            'k' => (int) ($number * 1024),
            default => (int) $number,
        };
    }
}
